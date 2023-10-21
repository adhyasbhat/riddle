const drawHangman = (incorrectGuesses) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "white"
    context.lineWidth = 5;
 
    context.beginPath();
    context.moveTo(10, 180);
    context.lineTo(100, 180);
    context.stroke();


    if (incorrectGuesses >= 1) {
        context.beginPath();
        context.moveTo(55, 180);
        context.lineTo(55, 10);
        context.stroke();
    }


    if (incorrectGuesses >= 2) {
        context.beginPath();
        context.moveTo(55, 10);
        context.lineTo(85, 10);
        context.stroke();
    }


    if (incorrectGuesses >= 3) {
        context.beginPath();
        context.arc(85, 30, 15, 0, Math.PI * 2);
        context.stroke();
    }

 
    if (incorrectGuesses >= 4) {
        context.beginPath();
        context.moveTo(85, 45);
        context.lineTo(85, 95);
        context.stroke();
    }


    if (incorrectGuesses >= 5) {
        context.beginPath();
        context.moveTo(85, 45);
        context.lineTo(70, 60);
        context.stroke();
    }


    if (incorrectGuesses >= 6) {
        context.beginPath();
        context.moveTo(85, 45);
        context.lineTo(100, 60);
        context.stroke();
    }

 
    if (incorrectGuesses >= 7) {
        context.beginPath();
        context.moveTo(85, 95);
        context.lineTo(70, 110);
        context.stroke();
    }

    if (incorrectGuesses >= 8) {
        context.beginPath();
        context.moveTo(85, 95);
        context.lineTo(100, 110);
        context.stroke();
    }
};