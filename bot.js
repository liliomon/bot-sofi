const puppeteer = require('puppeteer');

async function voteBot() {
    console.log('🤖 Iniciando bot de votación para Sofia Pepper...');
    
    let browser;
    try {
        // Lanzar navegador
        browser = await puppeteer.launch({
            headless: false, // Cambiar a true si no quieres ver el navegador
            defaultViewport: null,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Tiempo de inicio
        const startTime = Date.now();
        const duration = 60 * 1000; // 1 minuto en milisegundos
        let voteCount = 0;
        let attempts = 0;
        
        console.log('⏰ Votando durante 1 minuto...');
        
        while (Date.now() - startTime < duration) {
            attempts++;
            const remainingTime = Math.ceil((duration - (Date.now() - startTime)) / 1000);
            
            try {
                console.log(`\n🗳️  Intento #${attempts} (${remainingTime}s restantes)`);
                
                // Navegar a la página de la encuesta
                console.log('📄 Cargando página...');
                await page.goto('https://poll.fm/15690408', { 
                    waitUntil: 'domcontentloaded',
                    timeout: 15000 
                });
                
                // Esperar que la página cargue
                await page.waitForTimeout(3000);
                
                // Buscar la opción de Sofia Pepper de diferentes maneras
                console.log('🔍 Buscando opción de Sofia Pepper...');
                
                // Método 1: Buscar por texto exacto
                let found = false;
                const options = await page.$$('label, div, span, li');
                
                for (let option of options) {
                    const text = await page.evaluate(el => el.textContent, option);
                    if (text && text.includes('Sofia Pepper')) {
                        console.log('✅ Opción encontrada, haciendo clic...');
                        await option.click();
                        found = true;
                        break;
                    }
                }
                
                if (!found) {
                    // Método 2: Buscar input radio
                    const radioInputs = await page.$$('input[type="radio"]');
                    for (let input of radioInputs) {
                        const value = await page.evaluate(el => el.value, input);
                        const nextSibling = await page.evaluate(el => el.nextElementSibling?.textContent, input);
                        if ((value && value.includes('Sofia')) || (nextSibling && nextSibling.includes('Sofia'))) {
                            await input.click();
                            found = true;
                            console.log('✅ Radio button encontrado y seleccionado');
                            break;
                        }
                    }
                }
                
                if (found) {
                    // Esperar un poco antes de enviar
                    await page.waitForTimeout(1500);
                    
                    // Buscar botón de envío
                    console.log('📤 Buscando botón de envío...');
                    
                    const submitSelectors = [
                        'button[type="submit"]',
                        'input[type="submit"]',
                        'button:contains("Vote")',
                        'button:contains("Submit")',
                        '.vote-btn',
                        '.submit-btn',
                        '#vote-button',
                        '#submit'
                    ];
                    
                    let submitted = false;
                    for (let selector of submitSelectors) {
                        try {
                            const button = await page.$(selector);
                            if (button) {
                                await button.click();
                                console.log('✅ Voto enviado exitosamente');
                                voteCount++;
                                submitted = true;
                                break;
                            }
                        } catch (e) {
                            // Continuar con el siguiente selector
                        }
                    }
                    
                    if (!submitted) {
                        // Buscar por texto del botón
                        const buttons = await page.$$('button');
                        for (let button of buttons) {
                            const text = await page.evaluate(el => el.textContent.toLowerCase(), button);
                            if (text.includes('vote') || text.includes('submit') || text.includes('enviar')) {
                                await button.click();
                                console.log('✅ Voto enviado (botón encontrado por texto)');
                                voteCount++;
                                submitted = true;
                                break;
                            }
                        }
                    }
                    
                    if (!submitted) {
                        console.log('❌ No se pudo encontrar el botón de envío');
                    }
                    
                } else {
                    console.log('❌ No se encontró la opción de Sofia Pepper');
                }
                
                // Esperar antes del siguiente intento
                await page.waitForTimeout(2000);
                
            } catch (error) {
                console.log('❌ Error en este intento:', error.message);
                await page.waitForTimeout(1000);
            }
        }
        
        console.log(`\n🎉 Bot terminado!`);
        console.log(`📊 Total de votos realizados: ${voteCount}`);
        console.log(`🔄 Total de intentos: ${attempts}`);
        
    } catch (error) {
        console.error('💥 Error fatal:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Ejecutar el bot
console.log('🚀 Iniciando...');
voteBot().catch(console.error);
