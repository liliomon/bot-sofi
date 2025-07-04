const puppeteer = require('puppeteer');

async function startVotingBot() {
    console.log('🤖 Iniciando bot de votación para Sofia Pepper...');
    
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });
        
        const startTime = Date.now();
        const targetVotes = 10000; // 10,000 votos objetivo
        let voteCount = 0;
        let attempts = 0;
        
        console.log('🎯 Objetivo: 10,000 votos lo más rápido posible...\n');
        
        while (voteCount < targetVotes) {
            attempts++;
            const elapsedTime = Math.ceil((Date.now() - startTime) / 1000);
            const remainingVotes = targetVotes - voteCount;
            
            try {
                console.log(`🗳️  Intento #${attempts} | Votos: ${voteCount}/${targetVotes} | Tiempo: ${elapsedTime}s`);
                
                // Ir a la página del poll
                await page.goto('https://poll.fm/15690408', { 
                    waitUntil: 'networkidle0',
                    timeout: 15000 
                });
                
                // Esperar mínimo para que cargue (optimizado para velocidad)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Buscar la opción de Sofia Pepper usando el label específico
                const sofiaFound = await page.evaluate(() => {
                    // Primero intentar con el label específico para Sofia Pepper
                    const sofiaLabel = document.querySelector('label[for="PDI_answer69193189"]');
                    if (sofiaLabel) {
                        sofiaLabel.click();
                        return true;
                    }
                    
                    // Método alternativo: buscar por texto
                    const labels = document.querySelectorAll('label, div, span');
                    for (let label of labels) {
                        if (label.textContent && label.textContent.includes('Sofia Pepper')) {
                            label.click();
                            return true;
                        }
                    }
                    
                    // Buscar radio buttons como último recurso
                    const radios = document.querySelectorAll('input[type="radio"]');
                    for (let radio of radios) {
                        const nextElement = radio.nextElementSibling;
                        if (nextElement && nextElement.textContent && nextElement.textContent.includes('Sofia Pepper')) {
                            radio.click();
                            return true;
                        }
                    }
                    return false;
                });
                
                if (sofiaFound) {
                    console.log('✅ Opción de Sofia seleccionada');
                    
                    // Esperar mínimo antes de votar
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Buscar y hacer clic en el botón Vote usando el ID específico
                    const voteClicked = await page.evaluate(() => {
                        // Primero intentar con el ID específico
                        const voteButton = document.getElementById('pd-vote-button15690408');
                        if (voteButton) {
                            voteButton.click();
                            return true;
                        }
                        
                        // Método alternativo si no encuentra el ID
                        const buttons = document.querySelectorAll('button, input[type="submit"]');
                        for (let button of buttons) {
                            if (button.textContent && button.textContent.toLowerCase().includes('vote')) {
                                button.click();
                                return true;
                            }
                        }
                        return false;
                    });
                    
                    if (voteClicked) {
                        voteCount++;
                        console.log(`✨ Voto #${voteCount} enviado!`);
                        
                        // Esperar mínimo para confirmación
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } else {
                        console.log('❌ No se encontró el botón Vote');
                    }
                } else {
                    console.log('❌ No se encontró la opción de Sofia');
                }
                
                // Pausa mínima antes del siguiente intento (optimizado)
                await new Promise(resolve => setTimeout(resolve, 500));
                
            } catch (error) {
                console.log('⚠️ Error:', error.message);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        const totalTime = Math.ceil((Date.now() - startTime) / 1000);
        console.log('\n🎉 Votación completada!');
        console.log(`📊 Votos realizados: ${voteCount}/${targetVotes}`);
        console.log(`🔄 Intentos totales: ${attempts}`);
        console.log(`⏱️ Tiempo total: ${totalTime} segundos`);
        console.log(`⚡ Tasa de éxito: ${((voteCount/attempts)*100).toFixed(1)}%`);
        console.log(`🚀 Velocidad: ${(voteCount/totalTime*60).toFixed(1)} votos/minuto`);
        
    } catch (error) {
        console.error('💥 Error fatal:', error.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Ejecutar
console.log('🚀 Bot de votación TURBO iniciando...');
console.log('🎯 Votando por: Sofia Pepper, Amarillo High girls soccer');
console.log('📍 Poll: https://poll.fm/15690408');
console.log('🎯 Objetivo: 10,000 votos lo más rápido posible\n');

startVotingBot().catch(console.error);
