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

  defaultDateInInput = this.getTodayDate();
  errorMessage: string;
  exportFormRecebimento = new FormGroup({
    dataInicial: new FormControl(this.getTodayDate(), [Validators.required]),
    dataFinal: new FormControl(this.getTodayDate(), [Validators.required]),
    searchType: new FormControl('DATA_RECEBIMENTO', [Validators.required]),
  });

  constructor(private tokenService: TokenService, private exportMdfeService: ExportarMdfesService, private router: Router) { }

  ngOnInit(): void {
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
    if (type === undefined || type === null || type === '') {
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
    this.resetBuscaRadios();
  }

  resetBuscaRadios() {
    let recebimento = document.getElementById('recebimento') as HTMLInputElement;
    let emissao = document.getElementById('emissao') as HTMLInputElement;

    if (!recebimento.checked) {
      recebimento.checked = true;
    }

    if (emissao.checked) {
      emissao.checked = false;
    }
  }

  setValueFromSearchType(e) {
    this.errorMessage = '';
    if (e.target.value === undefined) {
      this.errorMessage = 'Favor selecionar um tipo de busca';
      return;
    }

    if (e.target.value === 'recebimento') {
      this.exportFormRecebimento.controls.searchType.setValue('DATA_RECEBIMENTO');
    }

    if (e.target.value === 'emissao') {
      this.exportFormRecebimento.controls.searchType.setValue('DATA_EMISSAO');
    }
  }

  logout() {
    this.tokenService.removeAuthorizationFromLocalStorage();
    this.router.navigate(['/login']);
  }

  getTodayDate(): string {
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    let monthWithZero = this.setZeroIfNeeds((month + 1));
    let dayWithZero = this.setZeroIfNeeds(day);

    return year + "-" + monthWithZero + "-" + dayWithZero;
  }

  setZeroIfNeeds(number: number): string {
    if (number < 10) {
      return '0' + number;
    }
    return number.toString();
  }
}
