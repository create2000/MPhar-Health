import 'zone.js/node'; // Required for Angular Universal
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';
import { AppServerModule } from './app.server.module';

// Enable production mode if in production
if (environment.production) {
  enableProdMode();
}

const app = express();
const PORT = process.env['PORT'] || 4000;

// Set the folder where static files will be served from
const DIST_FOLDER = join(process.cwd(), 'dist/healthcare-app/browser');

// Serve static files
app.use(express.static(DIST_FOLDER));

// Set up the Angular Universal engine
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule,
  }) as any // Add `as any` to bypass type incompatibility
);

// Set the view engine to use the Angular engine
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Handle all routes with Angular Universal
app.get('*', (req, res) => {
  res.render('index.html', { req });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
