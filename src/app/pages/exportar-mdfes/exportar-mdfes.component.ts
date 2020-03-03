import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

// Services
import { TokenService } from 'src/app/services/AuthToken/token.service';
import { ExportarMdfesService } from './exportar-mdfes.service';

@Component({
  selector: 'app-exportar-mdfes',
  templateUrl: './exportar-mdfes.component.html',
  styleUrls: ['./exportar-mdfes.component.css']
})
export class ExportarMdfesComponent implements OnInit {

  errorMessage: string;
  exportFormRecebimento = new FormGroup({
    dataInicial: new FormControl('', [Validators.required]),
    dataFinal: new FormControl('', [Validators.required]),
    searchType: new FormControl('', [Validators.required]),
  });

  searchTypes = [
    'Selecionar um tipo',
    'Recebimento',
    'Emissão'
  ];

  constructor(private tokenService: TokenService, private exportMdfeService: ExportarMdfesService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.containsInLocalStorage()) {
      this.router.navigate(['/login']);
    }
  }

  async exportRecebimento() {
    this.errorMessage = '';
    let searchType = this.exportFormRecebimento.controls.searchType.value;
    let initialDate = this.exportFormRecebimento.controls.dataInicial.value;
    let endDate = this.exportFormRecebimento.controls.dataFinal.value;

    this.validate(searchType, initialDate, endDate);

    await this.exportMdfeService.exportExcelWithMDFes(searchType, initialDate, endDate);
    this.limparRecebimentoForm();
  }

  validate(type: string, initialDate: string, endDate: string): void {
    if (type === undefined || type === '') {
      throw this.errorMessage = 'Favor selecionar um tipo de busca';
    }

    if (initialDate === undefined || initialDate === null || initialDate === '') {
      throw this.errorMessage = 'Necessário digitar uma data inicial válida.';
    }

    if (initialDate.length > 10 || initialDate.length < 10) {
      throw this.errorMessage = 'Necessário digitar uma data inicial válida.';
    }

    if (endDate === undefined || endDate === null || endDate === '') {
      throw this.errorMessage = 'Necessário digitar uma data final válida.';
    }

    if (endDate.length > 10 || endDate.length < 10) {
      throw this.errorMessage = 'Necessário digitar uma data final válida.';
    }
  }

  limparRecebimentoForm() {
    this.exportFormRecebimento.controls.dataInicial.setValue('');
    this.exportFormRecebimento.controls.dataFinal.setValue('');
    this.errorMessage = '';
  }

  setValueFromSearchType(e) {
    this.errorMessage = '';
    if (e.target.value === undefined || e.target.value === 'Selecionar um tipo') {
      this.errorMessage = 'Favor selecionar um tipo de busca';
      return;
    }

    if (e.target.value === 'Recebimento') {
      this.exportFormRecebimento.controls.searchType.setValue('DATA_RECEBIMENTO');
    } else {
      this.exportFormRecebimento.controls.searchType.setValue('DATA_EMISSAO');
    }
  }

  logout() {
    this.tokenService.removeAuthorizationFromLocalStorage();
    this.router.navigate(['/login']);
  }
}
