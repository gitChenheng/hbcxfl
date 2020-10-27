import {CTRL, GET, POST} from "@/constans/decorator";

export const verbDescriptors = {
    type: "type",
}

export function Ctrl(target) {
    target[verbDescriptors.type] = CTRL;
}

export function Get(target, descriptor) {
    target[descriptor].method = GET;
}

export function Post(target, descriptor) {
    target[descriptor].method = POST;
}

export function Api(target, descriptor) {
    target[descriptor].reqPrefix = "/api/";
}

export function View(target, descriptor) {
    target[descriptor].method = GET;
    target[descriptor].reqPrefix = "/";
}
