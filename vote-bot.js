const { chromium } = require('playwright');

async function voteBot() {
    console.log('🤖 Iniciando bot de votación...');
    
    const browser = await chromium.launch({
        headless: false // Para ver el navegador
    });
    
    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        const startTime = Date.now();
        const duration = 60 * 1000; // 1 minuto
        let voteCount = 0;
        
        while (Date.now() - startTime < duration) {
            try {
                const remainingTime = Math.ceil((duration - (Date.now() - startTime)) / 1000);
                console.log(`\n🕒 Tiempo restante: ${remainingTime} segundos`);
                
                // Navegar a la página
                await page.goto('https://poll.fm/15690408', { timeout: 10000 });
                
                // Buscar y hacer clic en la opción de Sofia Pepper
                const sofiaOption = await page.locator('text="Sofia Pepper, Amarillo High girls soccer"').first();
                if (await sofiaOption.isVisible()) {
                    await sofiaOption.click();
                    console.log('✅ Opción seleccionada');
                    
                    // Buscar y hacer clic en el botón de votar
                    const voteButton = await page.locator('button:has-text("Vote")').first();
                    if (await voteButton.isVisible()) {
                        await voteButton.click();
                        voteCount++;
                        console.log(`✨ Voto #${voteCount} enviado exitosamente`);
                    }
                } else {
                    console.log('❌ No se encontró la opción');
                }
                
                // Esperar un poco antes del siguiente intento
                await page.waitForTimeout(2000);
                
            } catch (error) {
                console.log('⚠️ Error en este intento:', error.message);
                await page.waitForTimeout(1000);
            }
        }
        
        console.log('\n🎉 Bot terminado!');
        console.log(`📊 Total de votos realizados: ${voteCount}`);
        
    } catch (error) {
        console.error('💥 Error fatal:', error);
    } finally {
        await browser.close();
    }
}

// Ejecutar el bot
console.log('🚀 Iniciando...');
voteBot().catch(console.error);
