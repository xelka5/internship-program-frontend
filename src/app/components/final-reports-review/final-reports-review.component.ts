import { Component, OnInit } from '@angular/core';
import { FinalReportService } from 'src/app/services/api/final-report/final-report.service';
import { UrlService } from 'src/app/services/core/url/url.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-final-reports-review',
  templateUrl: './final-reports-review.component.html',
  styleUrls: ['./final-reports-review.component.scss']
})
export class FinalReportsReviewComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  internshipFinalReports: any;
  internshipTrackingNumber: string;

  constructor(private adminService: AdminService, private urlService: UrlService,
    private router: Router) { }

  ngOnInit(): void {
    this.internshipTrackingNumber = this.urlService.getTrackingNumberFromUrl(this.router.url);
    this.fetchInternshipFinalReports();
  }

  private fetchInternshipFinalReports() {
    this.adminService.getFinalInternshipReports(this.internshipTrackingNumber).subscribe(result => {
      this.internshipFinalReports = result;
      console.log(this.internshipFinalReports);
    });
  }

}
