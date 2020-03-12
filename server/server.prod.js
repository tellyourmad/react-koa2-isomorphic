import "babel-polyfill";
import serve from "koa-static";
import path from "path";
import views from "koa-views";
import app from "./app";
import apiRoute from "./routes/apiRoute";
import viewRoute from "./routes/viewRoute";

const port = process.env.port || 80;

app.use(
  views(path.resolve(__dirname, "../views/prod"), { map: { html: "ejs" } })
);
app.use(serve(path.resolve(__dirname, "../dist/client")));
app.use(viewRoute);
app.use(apiRoute.routes());
app.use(apiRoute.allowedMethods());
app.listen(port);
console.log(
  `\n==>Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
);
