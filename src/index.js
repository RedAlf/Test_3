"use strict"

import "./style.scss";
import * as $ from "jquery";

//$("p").hide();

const fieldSize = 4;
let field = document.getElementsByClassName('field')[0];
let start = document.getElementsByTagName('button')[0];
let solved = 0;


function CheckCells(cell1, cell2) {
    if (cell1.className === cell2.className) {
        return true;
    } else {
        return false;
    }
};

function Mistake(cell1, cell2) {
    cell1.classList.toggle('hidden');
    cell2.classList.toggle('hidden');
    cell1.classList.toggle('selected');
    cell2.classList.toggle('selected');
};

function Match(cell1, cell2) {
    cell1.classList.toggle('selected');
    cell1.classList.toggle('cell');
    cell1.classList.toggle('solved');
    cell2.classList.toggle('selected');
    cell2.classList.toggle('cell');
    cell2.classList.toggle('solved');
    solved++;
}

function CellSelected(cell) {
    cell.classList.toggle('hidden');
    cell.classList.toggle('selected');
    let selectedCells = document.getElementsByClassName('selected');
    if ( selectedCells.length === 2 ) {
        if ( CheckCells(selectedCells[0], selectedCells[1]) === false ) {
            setTimeout(Mistake(selectedCells[0], selectedCells[1]), 1000);
        } else {
            Match(selectedCells[0], selectedCells[1]);
            if ( solved === fieldSize * 2) {
                alert('Вы выиграли!\nЗатраченное время: ')
            }
        }
    }
};

// Функция создает поле заданного размера
function Initialisation() {
    for (let i = 0; i < fieldSize * fieldSize; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell', 'uncolored', 'hidden');
        cell.onclick = function() {
            CellSelected(this);
        }
        field.appendChild(cell);
    };
};

// Функция для получения случайного числа в заданном диапазоне (включительно)
function GetRandom(min, max) {
    return Math.floor( min + Math.random() * (max + 1 - min ));
};

// Функция задает ячейке цвет с указанным №
function ColorCell(colorNum) {
    let uncoloredCells = document.getElementsByClassName('uncolored');
    let pair = GetRandom(1, uncoloredCells.length - 1);
    uncoloredCells[0].classList.add('color' + colorNum);
    uncoloredCells[pair].classList.add('color' + colorNum);
    uncoloredCells[0].classList.remove('uncolored');
    uncoloredCells[pair - 1].classList.remove('uncolored');
    uncoloredCells = 0;
}

// Функция устанавливает случайным парам ячеек случайно выбираемые цвета
function SetColors() {
    let firstColor = GetRandom(0, (fieldSize * 2) - 1);
    for (let i = 0; i < fieldSize * 2; i++) {
        if ( i === 0 ) {
            ColorCell(firstColor)
        } else {
            if ( i === firstColor) {
                ColorCell(0)
            } else {
                ColorCell(i)
            }
        }
    }
};

start.onclick = function() {
    start.setAttribute('disabled', this.disabled);
    Initialisation();
    SetColors();
}