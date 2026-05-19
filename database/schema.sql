CREATE DATABASE IF NOT EXISTS stratedge_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE stratedge_db;

CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(80) NOT NULL,
  base_price INT NOT NULL CHECK (base_price >= 0),
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  client VARCHAR(120) NOT NULL,
  category VARCHAR(80) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(80) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  zip_code VARCHAR(5),
  company VARCHAR(80),
  campaign_start DATE,
  social_links VARCHAR(250),
  message VARCHAR(500),
  service_id VARCHAR(50) NOT NULL,
  estimated_total INT NOT NULL,
  status ENUM('Nuevo lead', 'Contactado', 'En cotizacion', 'Cliente activo', 'Cerrado') NOT NULL DEFAULT 'Nuevo lead',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_leads_services FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(60) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO services (id, name, category, base_price, description) VALUES
('web', 'Desarrollo Web', 'Digital', 1200, 'Sitios web corporativos, landing pages y portafolios responsivos.'),
('redes', 'Manejo de Redes Sociales', 'Digital', 650, 'Planeacion de contenido, publicaciones y administracion mensual.'),
('ads', 'Google Ads y Campanas', 'Publicidad', 800, 'Estructura, lanzamiento y optimizacion de campanas pagadas.'),
('branding', 'Branding e Identidad', 'Creativo', 900, 'Logo, slogan, guia basica de marca e identidad visual.'),
('foto-video', 'Foto y Video Profesional', 'Creativo', 700, 'Produccion de contenido visual para campanas digitales.'),
('editorial', 'Diseno Editorial', 'Impresos', 500, 'Menus, catalogos, revistas, folletos y materiales fisicos.');

INSERT INTO portfolio_projects (title, client, category, description, image)
SELECT 'Campana para restaurante local', 'California Restaurant Group', 'Redes Sociales', 'Contenido mensual y anuncios para incrementar reservaciones y visibilidad local.', 'https://placehold.co/900x600/0f172a/34d399?text=Campana+Restaurante'
WHERE NOT EXISTS (SELECT 1 FROM portfolio_projects WHERE title = 'Campana para restaurante local');

INSERT INTO portfolio_projects (title, client, category, description, image)
SELECT 'Identidad visual para empresa de servicios', 'Bay Area Services', 'Branding', 'Logo, slogan, colores y materiales iniciales para una marca bilingue.', 'https://placehold.co/900x600/0f172a/34d399?text=Branding'
WHERE NOT EXISTS (SELECT 1 FROM portfolio_projects WHERE title = 'Identidad visual para empresa de servicios');

INSERT INTO portfolio_projects (title, client, category, description, image)
SELECT 'Sitio web corporativo', 'Small Business Portfolio', 'Desarrollo Web', 'Sitio responsivo con portafolio, formulario y estructura SEO local.', 'https://placehold.co/900x600/0f172a/34d399?text=Sitio+Web'
WHERE NOT EXISTS (SELECT 1 FROM portfolio_projects WHERE title = 'Sitio web corporativo');
