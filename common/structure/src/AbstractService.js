"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return yield this.repository.create(data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return yield this.repository.destroy(id);
        });
    }
    find(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const [total, data] = yield this.repository.findAndCountAll(parameters);
            return [total, data];
        });
    }
    findAndCount(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let total;
            let data;
            // @ts-ignore
            [total, data] = yield this.repository.findAndCountAll(parameters);
            return [total, data];
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return yield this.repository.findByPk(id);
        });
    }
    findOne(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return yield this.repository.findOne(parameters, includes);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return yield this.repository.update(data, {
                where: {
                    id
                }
            });
        });
    }
}
exports.AbstractService = AbstractService;
