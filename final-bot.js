const { chromium } = require('playwright');

async function voteBot() {
    console.log('🤖 Iniciando bot de votación para Sofia Pepper...');
    console.log('⏰ Votando durante 1 minuto...');
    
    const browser = await chromium.launch({
        headless: false // Cambiar a true para ejecutar sin ventana visible
    });
    
    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        const startTime = Date.now();
        const duration = 60 * 1000; // 1 minuto en milisegundos
        let voteCount = 0;
        let attempts = 0;
        
        while (Date.now() - startTime < duration) {
            attempts++;
            const remainingTime = Math.ceil((duration - (Date.now() - startTime)) / 1000);
            
            try {
                console.log(`\n🗳️  Intento #${attempts} (${remainingTime}s restantes)`);
                
                // Navegar a la página del poll
                console.log('📄 Cargando página...');
                await page.goto('https://poll.fm/15690408', { 
                    waitUntil: 'domcontentloaded',
                    timeout: 15000 
                });
                
                // Esperar que la página cargue completamente
                await page.waitForTimeout(2000);
                
                // Buscar y hacer clic en la opción de Sofia Pepper
                console.log('🔍 Buscando opción de Sofia Pepper...');
                
                // Buscar el radio button de Sofia Pepper
                const sofiaRadio = page.locator('input[type="radio"]').filter({
                    has: page.locator('text=Sofia Pepper, Amarillo High girls soccer')
                }).first();
                
                // Alternativa: buscar por texto y luego el radio button asociado
                const sofiaOption = page.locator('text=Sofia Pepper, Amarillo High girls soccer').first();
                
                let clicked = false;
                
                // Intentar hacer clic en el radio button directamente
                if (await sofiaRadio.isVisible()) {
                    await sofiaRadio.click();
                    clicked = true;
                    console.log('✅ Radio button de Sofia seleccionado');
                } else if (await sofiaOption.isVisible()) {
                    // Si no funciona, hacer clic en el texto
                    await sofiaOption.click();
                    clicked = true;
                    console.log('✅ Opción de Sofia seleccionada por texto');
                } else {
                    // Método alternativo: buscar por coordenadas aproximadas
                    await page.click('text=Sofia Pepper');
                    clicked = true;
                    console.log('✅ Opción seleccionada por búsqueda de texto');
                }
                
                if (clicked) {
                    // Esperar un momento antes de enviar
                    await page.waitForTimeout(1000);
                    
                    // Buscar y hacer clic en el botón Vote
                    console.log('📤 Enviando voto...');
                    
                    const voteButton = page.locator('button:has-text("Vote")').first();
                    
                    if (await voteButton.isVisible()) {
                        await voteButton.click();
                        voteCount++;
                        console.log(`✨ Voto #${voteCount} enviado exitosamente!`);
                        
                        // Esperar a ver la página de confirmación
                        await page.waitForTimeout(2000);
                        
                        // Verificar si aparece el mensaje de agradecimiento
                        const thanksMessage = page.locator('text=Thanks for Voting');
                        if (await thanksMessage.isVisible()) {
                            console.log('✅ Confirmación de voto recibida');
                        }
                        
                    } else {
                        console.log('❌ No se encontró el botón Vote');
                    }
                } else {
                    console.log('❌ No se pudo seleccionar la opción de Sofia');
                }
                
                // Esperar antes del siguiente intento
                await page.waitForTimeout(3000);
                
            } catch (error) {
                console.log('⚠️ Error en este intento:', error.message);
                await page.waitForTimeout(2000);
            }
        }
        
        console.log('\n🎉 Bot terminado!');
        console.log(`📊 Total de votos realizados: ${voteCount}`);
        console.log(`🔄 Total de intentos: ${attempts}`);
        console.log(`⚡ Tasa de éxito: ${((voteCount/attempts)*100).toFixed(1)}%`);
        
    } catch (error) {
        console.error('💥 Error fatal:', error);
    } finally {
        await browser.close();
        console.log('🔒 Navegador cerrado');
    }
}

// Ejecutar el bot
console.log('🚀 Iniciando bot de votación automática...');
console.log('🎯 Objetivo: Votar por Sofia Pepper durante 1 minuto');
console.log('📍 URL: https://poll.fm/15690408');
console.log('');

voteBot().catch(console.error);
