module.exports = {
     apps: [
          {
               name: 'El-Record',
               script: './dist/src/app.js',
               instances: 1,
               exec_mode: 'fork'
          },
          {
               name: 'El-Record-Worker',
               script: './dist/src/Queue/worker.js',
               instances: 1,
               exec_mode: 'fork'
          }
     ]
};
