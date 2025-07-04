const puppeteer = require('puppeteer');

// --- Global state for tracking total votes and time ---
const totalState = {
    totalVotes: 0,
    startTime: Date.now(),
};

// --- Helper function to format milliseconds into a readable string (M:SS) ---
function formatElapsedTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}

// --- Function to log overall summary progress ---
function logOverallSummary(numInstances) {
    setInterval(() => {
        const elapsedMs = Date.now() - totalState.startTime;
        const elapsedTimeInMinutes = elapsedMs / (1000 * 60);
        const averageVotesPerMinute = elapsedTimeInMinutes > 0 ? totalState.totalVotes / elapsedTimeInMinutes : 0;

        console.log(`\n📊 [Resumen General]`);
        console.log(`   - Instancias Activas: ${numInstances}`);
        console.log(`   - Votos Totales: ${totalState.totalVotes}`);
        console.log(`   - Tiempo Transcurrido: ${formatElapsedTime(elapsedMs)}`);
        console.log(`   - Promedio General: ${averageVotesPerMinute.toFixed(2)} votos/minuto\n`);

    }, 60000); // Log a summary every 60 seconds
}

async function startVotingBot(instanceId) {
    console.log(`🤖 [Instancia ${instanceId}] Iniciando bot de votación para Sofia Pepper...`);
    
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage'
            ]
        });
        
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });
        
        while (true) {
            try {
                await page.goto('https://poll.fm/15690408', { 
                    waitUntil: 'networkidle0',
                    timeout: 15000 
                });
                
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const sofiaFound = await page.evaluate(() => {
                    const sofiaLabel = document.querySelector('label[for="PDI_answer69193189"]');
                    if (sofiaLabel) {
                        sofiaLabel.click();
                        return true;
                    }
                    return false;
                });
                
                if (sofiaFound) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    const voteClicked = await page.evaluate(() => {
                        const voteButton = document.getElementById('pd-vote-button15690408');
                        if (voteButton) {
                            voteButton.click();
                            return true;
                        }
                        return false;
                    });
                    
                    if (voteClicked) {
                        totalState.totalVotes++;
                        const elapsedMs = Date.now() - totalState.startTime;
                        const elapsedTimeInMinutes = elapsedMs / (1000 * 60);
                        const currentVPM = elapsedTimeInMinutes > 0 ? totalState.totalVotes / elapsedTimeInMinutes : 0;

                        console.log(
                            `✨ [Instancia ${instanceId}] Voto enviado! | Total: ${totalState.totalVotes} | Tiempo: ${formatElapsedTime(elapsedMs)} | Promedio: ${currentVPM.toFixed(2)} votos/min`
                        );
                        
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } else {
                        console.log(`❌ [Instancia ${instanceId}] No se encontró el botón de votar.`);
                    }
                } else {
                    console.log(`❌ [Instancia ${instanceId}] No se encontró la opción de Sofia.`);
                }
                
                await new Promise(resolve => setTimeout(resolve, 500));
                
            } catch (error) {
                console.log(`⚠️ [Instancia ${instanceId}] Error: ${error.message}. Reintentando...`);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
        
    } catch (error) {
        console.error(`💥 [Instancia ${instanceId}] Error fatal:`, error.message);
    } finally {
        if (browser) {
            await browser.close();
            console.log(`🚪 [Instancia ${instanceId}] Bot detenido y navegador cerrado.`);
        }
    }
}

// --- Main execution block for parallel instances ---
async function runParallelBots() {
    const numParallelInstances = parseInt(process.argv[2], 10);

    if (isNaN(numParallelInstances) || numParallelInstances <= 0) {
        console.error('Uso: node voting-bot.js <numero_de_instancias_paralelas>');
        console.error('Por favor, proporciona un número entero positivo.');
        process.exit(1);
    }

    console.log(`🚀 Iniciando ${numParallelInstances} bots de votación en paralelo...`);
    console.log('🎯 Votando por: Sofia Pepper, Amarillo High girls soccer');
    console.log('📍 Encuesta: https://poll.fm/15690408\n');
    console.log('ℹ️  Presiona Ctrl+C para detener el script.\n');

    logOverallSummary(numParallelInstances);

    const botPromises = [];
    for (let i = 1; i <= numParallelInstances; i++) {
        botPromises.push(startVotingBot(i));
    }

    await Promise.all(botPromises);

    console.log('\n✅ Todos los bots han sido detenidos.');
}

runParallelBots().catch(console.error);