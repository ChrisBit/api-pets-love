"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPetForUser = exports.petsAdopted = exports.petsForAdoption = exports.pet = exports.listPets = exports.add = void 0;
const pet_1 = __importDefault(require("../models/pet"));
exports.add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const register = yield pet_1.default.create(req.body);
        if (req.files) {
            if (req.files.length !== 0) {
                // @ts-ignore
                req.files.forEach(image => {
                    register.image.push(image.filename);
                });
            }
        }
        yield register.save();
        res.status(200).json(register);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Error occurred in create pet',
        });
    }
});
exports.listPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const register = yield pet_1.default.find()
            .populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 })
            .populate('userAdopter', { name: 1, email: 1, phone: 1 })
            .populate('userTransit', { name: 1, email: 1, phone: 1 })
            .populate('vet', { name: 1, email: 1, phone: 1 })
            .sort({ name: 1 })
            .exec();
        res.status(200).json(register);
    }
    catch (e) {
        res.status(500).send({
            message: 'An error occurred on petsForAdoption',
        });
    }
});
exports.pet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const register = yield pet_1.default.find({ _id: req.query._id })
            .populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 })
            .populate('userAdopter', { name: 1, email: 1, phone: 1 })
            .populate('userTransit', { name: 1, email: 1, phone: 1 })
            .populate('vet', { name: 1, email: 1, phone: 1 })
            .sort({ name: 1 })
            .exec();
        res.status(200).json(register);
    }
    catch (e) {
        res.status(500).send({
            message: 'An error occurred on petsForAdoption',
        });
    }
});
exports.petsForAdoption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    console.log(_id);
    try {
        const register = yield pet_1.default.find({
            adopted: false,
        })
            .populate('userCreator', { name: 1, email: 1, phone: 1 })
            .populate('userAdopter', { name: 1, email: 1, phone: 1 })
            .populate('userTransit', { name: 1, email: 1, phone: 1 })
            .populate('vet', { name: 1, email: 1, phone: 1 })
            .sort({ name: 1 })
            .exec();
        const pets = register.filter(pet => {
            if (pet.userCreator) {
                // @ts-ignore
                return pet.userCreator._id == req.query._id;
            }
        });
        res.status(200).json(pets);
    }
    catch (e) {
        res.status(500).send({
            message: 'An error occurred on petsForAdoption',
        });
    }
});
exports.petsAdopted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const register = yield pet_1.default.find({ adopted: true })
            .populate('userCreator', { name: 1, email: 1, phone: 1, role: 1 })
            .populate('userAdopter', { name: 1, email: 1, phone: 1 })
            .populate('userTransit', { name: 1, email: 1, phone: 1 })
            .populate('vet', { name: 1, email: 1, phone: 1 })
            .sort({ name: 1 })
            .exec();
        const pets = register.filter(pet => {
            if (pet.userCreator) {
                // @ts-ignore
                console.log(pet.userCreator._id, req.query._id);
                // @ts-ignore
                return pet.userCreator._id == req.query._id;
            }
        });
        res.status(200).json(pets);
    }
    catch (e) {
        res.status(500).send({
            message: 'An error occurred on petsAdopted',
        });
    }
});
exports.getPetForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const register = yield pet_1.default.find()
            .populate('userCreator', { name: 1, email: 1, phone: 1 })
            .populate('userAdopter', { name: 1, email: 1, phone: 1 })
            .populate('userTransit', { name: 1, email: 1, phone: 1 })
            .populate('vet', { name: 1, email: 1, phone: 1 })
            .sort({ name: 1 })
            .exec();
        const pets = register.filter(pet => {
            if (pet.userCreator) {
                // @ts-ignore
                return pet.userCreator._id == req.query._id;
            }
        });
        res.status(200).json(pets);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'An error occurred',
        });
    }
});