import { Injectable } from '@angular/core';

// Services
import { UrlService } from 'src/app/services/url.service';
import { TokenService } from 'src/app/services/AuthToken/token.service';

@Injectable({
  providedIn: 'root'
})
export class ExportarMdfesService {

  constructor(private tokenService: TokenService, private urlService: UrlService) { }

  exportExcelWithMDFes(dataType: string, initialDate: Date, endDate: Date) {
    return window.location.href = this.urlService.getDefaultUrl().concat(`/report/${dataType}?dataIni=${initialDate}&dataFin=${endDate}&auth=${this.tokenService.getAuthorization()}`);
  }
}
