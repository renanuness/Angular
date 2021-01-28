import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Produto } from "../models/produto";
import { ProdutoService } from "./produto.service";

@Injectable()
export class ProdutosResolve implements Resolve<Produto[]>{
    
    constructor(private produtoService: ProdutoService){ }

    resolve(route: ActivatedRouteSnapshot){
        return this.produtoService.obterTodos(route.params.estado);
    }

}