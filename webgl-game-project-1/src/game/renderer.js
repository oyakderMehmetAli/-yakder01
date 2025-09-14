class Renderer {
    constructor(gl) {
        this.gl = gl;
        this.shaderProgram = null;
        this.buffers = {};
    }

    initShaders(vertexShaderSource, fragmentShaderSource) {
        const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(this.shaderProgram));
        }
    }

    loadShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            return shader;
        } else {
            console.error('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
    }

    createBuffers(vertices) {
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        this.buffers.vertexBuffer = buffer;
    }

    drawScene() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.useProgram(this.shaderProgram);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
        const position = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
        this.gl.vertexAttribPointer(position, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(position);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    }
}

export default Renderer;