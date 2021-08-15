/* eslint-disable no-console */
const shell = require('shelljs');

console.log('Olá mundo');

const resultado = shell.exec('git diff --name-only m02a05-Setup_de_projetos_like_a_PRO..main');

console.log(resultado.stdout.split('\n'));
