#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

const mode = [0, 0, 0];
const permissions = {
  user: {
    read: false,
    write: false,
    execute: false
  },
  group: {
    read: false,
    write: false,
    execute: false
  },
  other: {
    read: false,
    write: false,
    execute: false
  }
};
clear();
console.log(
  chalk.green(figlet.textSync('chmodr', { horizontalLayout: 'full' }))
);

const file = process.argv.slice(2);
if (file.length === 1 && file[0] && fs.existsSync(file[0])) {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'user permissions',
        name: 'user',
        choices: ['read', 'write', 'execute']
      },
      {
        type: 'checkbox',
        message: 'group permissions',
        name: 'group',
        choices: ['read', 'write', 'execute']
      },
      {
        type: 'checkbox',
        message: 'other permissions',
        name: 'other',
        choices: ['read', 'write', 'execute']
      }
    ])
    .then((answers) => {
      Object.keys(answers).forEach((a) => {
        Object.keys(permissions).forEach((p) => {
          if (a === p && answers[a].length >= 1) {
            answers[a].map((b) => (permissions[a][b] = true));
          }
        });
      });
      Object.keys(permissions).forEach((k) => {
        if (k === 'user') {
          if (permissions[k].read) {
            mode[0] += 4;
          }
          if (permissions[k].write) {
            mode[0] += 2;
          }
          if (permissions[k].execute) {
            mode[0] += 1;
          }
        }
        if (k === 'group') {
          if (permissions[k].read) {
            mode[1] += 4;
          }
          if (permissions[k].write) {
            mode[1] += 2;
          }
          if (permissions[k].execute) {
            mode[1] += 1;
          }
        }
        if (k === 'other') {
          if (permissions[k].read) {
            mode[2] += 4;
          }
          if (permissions[k].write) {
            mode[2] += 2;
          }
          if (permissions[k].execute) {
            mode[2] += 1;
          }
        }
      });
      console.log(chalk.yellow(`run: chmod ${mode.join('')} ${file[0]}`));
    });
} else {
  console.log(chalk.magenta('pass in the correct file name'));
  process.exit();
}
