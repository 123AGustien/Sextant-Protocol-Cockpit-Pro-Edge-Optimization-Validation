document.addEventListener("DOMContentLoaded", () => {

    const runButton = document.getElementById("runOptimization");
    const fill = document.getElementById("fill");
    const line = document.getElementById("line");
    const result = document.getElementById("result");

    if (!runButton || !fill || !line || !result) {
        console.error("NeuralEdge Optimizer UI wiring error.");
        return;
    }

    runButton.addEventListener("click", () => {

        runButton.disabled = true;
        runButton.textContent = "Optimization Running...";

        fill.style.width = "100%";
        line.style.height = "100%";

        setTimeout(() => {

            result.hidden = false;

            runButton.disabled = false;
            runButton.textContent = "Run Optimization Cycle";

        }, 1800);
    });

});
