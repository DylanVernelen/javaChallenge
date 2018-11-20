import {Component, Input, OnInit} from '@angular/core';
import {Reward} from '../../interfaces/reward';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  @Input() item: Reward;
  @Input() index: number;
  activeModal: NgbActiveModal;

  constructor(private modal: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.activeModal = this.modal.open(content);
  }

  close() {
    this.activeModal.close();
  }

}
