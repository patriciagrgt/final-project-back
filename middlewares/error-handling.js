
//Manejador de rutas no encontradas
export const notFoundHandler = (app) => {
    app.use ((req, res, next) => {
    res.status(404).json({ message: "This route does not exist" });
});
}

//Manejador de errores
export const errorHandler = (app) => {
    app.use((err, req, res, next) => {
        console.error("Error:", req.method, req.path, err);
        res.status(500).json({ message: "Internal Server Error" });
    });
};



