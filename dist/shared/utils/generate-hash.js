"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateHash = generateHash;
/* eslint-disable no-plusplus */
function generateHash() {
  const numbers = '0123456789';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabfeofjs';
  let hash = '';

  // Adicionar 5 números ao hash
  for (let i = 0; i < 2; i++) {
    hash += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  // Adicionar 1 letra ao hash
  hash += letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 0; i < 4; i++) {
    hash += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  hash += letters.charAt(Math.floor(Math.random() * letters.length));
  return hash;
}