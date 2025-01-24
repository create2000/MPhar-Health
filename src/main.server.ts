import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppServerModule } from './app/app.server.module';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express'; 
import { join } from 'path';

if (environment.production) {
  enableProdMode();
}

const app = express();
const PORT = process.env.PORT || 4000;

// Serve static files
const DIST_FOLDER = join(process.cwd(), 'dist/healthcare-app/browser');
app.use(express.static(DIST_FOLDER));

// Engine setup
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));

// Routes
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'index.html'), { req });
});

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
