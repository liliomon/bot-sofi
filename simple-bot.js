const axios = require('axios');

async function voteBot() {
    console.log('🤖 Iniciando bot de votación simple para Sofia Pepper...');
    
    const pollUrl = 'https://poll.fm/15690408';
    const startTime = Date.now();
    const duration = 60 * 1000; // 1 minuto
    let voteCount = 0;
    let attempts = 0;
    
    // Configurar axios con headers realistas
    const axiosConfig = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        },
        timeout: 10000
    };
    
    console.log('⏰ Votando durante 1 minuto...');
    
    while (Date.now() - startTime < duration) {
        attempts++;
        const remainingTime = Math.ceil((duration - (Date.now() - startTime)) / 1000);
        
        try {
            console.log(`\n🗳️  Intento #${attempts} (${remainingTime}s restantes)`);
            
            // Primero obtener la página para encontrar el formulario
            console.log('📄 Obteniendo página del poll...');
            const response = await axios.get(pollUrl, axiosConfig);
            
            // Buscar información del formulario en el HTML
            const html = response.data;
            
            // Buscar el action del formulario y otros datos necesarios
            const formActionMatch = html.match(/action="([^"]+)"/);
            const csrfMatch = html.match(/name="csrf[^"]*"\s+value="([^"]+)"/);
            const pollIdMatch = html.match(/poll[_-]?id[^>]*value="([^"]+)"/i);
            
            // Buscar la opción de Sofia Pepper
            const sofiaMatch = html.match(/value="([^"]*)"[^>]*>.*?Sofia\s+Pepper/i);
            
            if (sofiaMatch) {
                const sofiaValue = sofiaMatch[1];
                console.log('✅ Opción de Sofia encontrada:', sofiaValue);
                
                // Preparar datos del formulario
                const formData = new URLSearchParams();
                formData.append('vote', sofiaValue);
                
                if (csrfMatch) {
                    formData.append('csrf', csrfMatch[1]);
                }
                if (pollIdMatch) {
                    formData.append('poll_id', pollIdMatch[1]);
                }
                
                // Determinar URL de envío
                let submitUrl = pollUrl;
                if (formActionMatch && formActionMatch[1]) {
                    submitUrl = formActionMatch[1].startsWith('http') 
                        ? formActionMatch[1] 
                        : `https://poll.fm${formActionMatch[1]}`;
                }
                
                // Enviar voto
                console.log('📤 Enviando voto...');
                const submitResponse = await axios.post(submitUrl, formData, {
                    ...axiosConfig,
                    headers: {
                        ...axiosConfig.headers,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Referer': pollUrl
                    }
                });
                
                if (submitResponse.status === 200) {
                    voteCount++;
                    console.log('✅ Voto enviado exitosamente!');
                } else {
                    console.log('❌ Error al enviar voto, código:', submitResponse.status);
                }
                
            } else {
                console.log('❌ No se encontró la opción de Sofia Pepper en el HTML');
                
                // Mostrar parte del HTML para debug
                const snippet = html.substring(0, 500);
                console.log('📝 Snippet del HTML:', snippet);
            }
            
        } catch (error) {
            console.log('❌ Error en este intento:', error.message);
        }
        
        // Esperar antes del siguiente intento
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    console.log(`\n🎉 Bot terminado!`);
    console.log(`📊 Total de votos realizados: ${voteCount}`);
    console.log(`🔄 Total de intentos: ${attempts}`);
}

// Ejecutar el bot
console.log('🚀 Iniciando bot simple...');
voteBot().catch(console.error);
