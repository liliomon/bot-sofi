console.log('🚀 Test iniciado...');

async function test() {
    console.log('✅ Función test ejecutándose');
    
    for (let i = 1; i <= 5; i++) {
        console.log(`📝 Iteración ${i}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('🎉 Test completado');
}

test().catch(console.error);
