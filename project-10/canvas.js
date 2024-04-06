document.addEventListener('DOMContentLoaded', () => {

    const canvaEditor = document.getElementById('canvas');
    let ctx = canvaEditor.getContext('2d'); 

    canvaEditor.width = window.innerWidth;
    canvaEditor.height = window.innerHeight;
    let hue = 0;
    let markerWidth = true;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    let isDrawing = false;
    let lastDrawX = 0;
    let startDrawY = 0;

    function draw(e) {
        if (!isDrawing) return;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(lastDrawX, startDrawY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastDrawX, startDrawY] = [e.offsetX, e.offsetY];
        console.log(e);
    
        if (hue >= 360) {
            hue = 0;
        }
        hue++;
    
        if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
            markerWidth = !markerWidth; 
        }
    
        if (markerWidth) {
            ctx.lineWidth++;
        } else {
            ctx.lineWidth--;
        }
    
        console.log(ctx.lineWidth);
        console.log(hue);
    }
    
    
    canvaEditor.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastDrawX, startDrawY] = [e.offsetX, e.offsetY];
    });

    canvaEditor.addEventListener('mousemove', draw);
    canvaEditor.addEventListener('mouseup', () => isDrawing = false);
    canvaEditor.addEventListener('mouseleave', () => isDrawing = false);



    /*    canvaEditor.addEventListener('mousedown', (e) => {
           isDrawing = true;
           startX = e.clientX;
           startY = e.clientY;
       })
   
       canvaEditor.addEventListener('mouseup', (e) => {
           isDrawing = false;
       })
   
       canvaEditor.addEventListener('mousemove', (e) => {
           if (isDrawing) {
               ctx.lineTo(e.clientX, e.clientY);
               ctx.stroke();
           }
       })
   
       canvaEditor.addEventListener('mouseleave', (e) => {
           isDrawing = false;
       })
   
       
   
   
   
    */






})