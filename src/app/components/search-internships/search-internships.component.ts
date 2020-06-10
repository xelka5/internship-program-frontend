import { Component, OnInit } from '@angular/core';
import { InternshipService } from 'src/app/services/api/internship/internship.service';
import { ToastrService } from 'ngx-toastr';
import { Internship } from 'src/app/interfaces/internship/internship';

@Component({
  selector: 'app-search-internships',
  templateUrl: './search-internships.component.html',
  styleUrls: ['./search-internships.component.scss']
})
export class SearchInternshipsComponent implements OnInit {

  internships: Internship[];

  constructor(private internshipService: InternshipService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllInternships();
  }

  getAllInternships(): void {
    this.internshipService.getAllInternships().subscribe(result => {
      console.log(result);
      this.internships = result;
    });
  }

}
