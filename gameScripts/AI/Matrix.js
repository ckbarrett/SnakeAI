class Matrix {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0))
    }

    map(f) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = f(this.data[i][j], i, j)
            }
        }
    }

    static map(matrix, func) {
        return new Matrix(matrix.rows, matrix.cols).map((e, i, j) => func(matrix.data[i][j], i, j));
    }

    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((e, i) => arr[i]);
    }

    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    randomize() {
        return this.map(e => Math.random() * 2 - 1);
    }

    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((e, i) => arr[i])
    }

    static transpose(matrix) {
        return new Matrix(matrix.cols, matrix.rows).map((_, i, j) => matrix.data[j][i]);
    }

    static subtract(a, b) {
        if (a.rows != b.rows || a.cols != b.cols) {
            console.log("Rows and cols must match");
            return;
        }
        return new Matrix(a.rows, a.cols).map((_, i, j) => a.data[i][j] - b.data[i][j])
    }

    static multiply(a, b) {
        // Matrix product
        if (a.cols !== b.rows) {
            console.log('Columns of A must match rows of B.');
            return;
        }

        return new Matrix(a.rows, b.cols)
            .map((e, i, j) => {
                // Dot product of values in col
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j];
                }
                return sum;
            });
    }

    multiply(n) {
        //Matrix by matrix or scalar by matrix
        if (n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
                console.log('Columns and Rows of A must match Columns and Rows of B.');
                return;
            }
            return this.map((e, i, j) => e * n.data[i][j]);
        } else {
            return this.map(e => e * n);
        }
    }

    add(n) {
        //Matrix by matrix or scalar by matrix
        if (n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
                console.log('Columns and Rows of A must match Columns and Rows of B.');
                return;
            }
            return this.map((e, i, j) => e + n.data[i][j]);
        } else {
            return this.map(e => e + n);
        }
    }

    print() {
        console.table(this.data)
        return this;
    }
}