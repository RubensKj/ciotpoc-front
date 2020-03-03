import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { UrlService } from 'src/app/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class ExportarMdfesService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  exportExcelWithMDFes(dataType: string, initialDate: Date, endDate: Date) {
    return window.location.href = this.urlService.getDefaultUrl().concat(`/report/${dataType}?dataIni=${initialDate}&dataFin=${endDate}`);
  }
}
