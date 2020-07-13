import { Component, OnInit, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminService } from 'src/app/services/api/admin/admin.service';
import { UserDetails } from 'src/app/interfaces/user/user-details';
import { UpdatePendingUserStatus } from 'src/app/interfaces/admin/update-pending-user-status';
import { UserRole } from 'src/app/shared/enums';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-approvals',
  templateUrl: './pending-approvals.component.html',
  styleUrls: ['./pending-approvals.component.scss']
})
export class PendingApprovalsComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  pageNumber: number = 1;

  EMPLOYER: string = UserRole.EMPLOYER.toString();
  BLOCKED: string = UserRole.BLOCKED.toString();

  modalRef: BsModalRef;

  pendingApprovals: UserDetails[];

  selectedPendingApproval: UserDetails;
  userAllowed: boolean;
  confirmationModalLabel: string;

  constructor(private adminService: AdminService, private modalService: BsModalService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPendingApprovals();
  }

  openConfirmationModal(template: TemplateRef<any>, pendingApproval: UserDetails, userAllowed: boolean): void {
    this.selectedPendingApproval = pendingApproval;
    this.userAllowed = userAllowed;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public updatePendingUserStatus(): void {

    let updateBody: UpdatePendingUserStatus = {
      userAllowed: this.userAllowed,
      userEmail: this.selectedPendingApproval.account.email
    }

    this.adminService.updatePendingUserStatus(updateBody).subscribe(result => {
      this.getPendingApprovals();
      this.modalRef.hide();
      this.toastr.success('Pending approval updated');
    });
  }

  private getPendingApprovals() {
    this.adminService.getPendingApprovals().subscribe(result => {
      this.pendingApprovals = result;
    });
  }

}
