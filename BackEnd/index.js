import('pocketbase').then(PocketBaseModule => {
const PocketBase = PocketBaseModule.default; // Importation du package PocketBase
const url = 'https://afrijet.pockethost.io/' // lien vers PocketHost.io
const client = new PocketBase(url) // creation d'une connexion avec PocketHost pour mon PocketBase

// Fonction pour vérifier la connexion à la base de données
async function checkDatabaseConnection() {
    try {
        // Authentifiez-vous avec le compte administrateur
        await client.admins.authWithPassword('tchajipchrist23@gmail.com', 'Pockethost237');

      // Vérifier la connexion en listant une collection
      //const records = await client.collection('AgenceSurvey').getList();
      
      // Si la connexion réussit, affiche un message de confirmation
      console.log('Connexion à la base de données réussie !');
      // console.log('Données récupérées :', records);
    } catch (error) {
      // Si la connexion échoue, affiche l'erreur
      console.error('Erreur de connexion à la base de données :', error);
    }
  }
  
  // Appel de la fonction pour vérifier la connexion
  checkDatabaseConnection()
});