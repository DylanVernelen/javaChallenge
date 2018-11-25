import {Component, Input, OnInit} from '@angular/core';
import {Reward} from '../../interfaces/reward';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../interfaces/user';
import {RewardService} from '../../services/reward.service';
import {RewardCategory} from '../../interfaces/reward-category';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  @Input() item: Reward;
  @Input() index: number;
  activeModal: NgbActiveModal;
  user: User;

  constructor(private modal: NgbModal, private rewardService: RewardService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    if (!this.item.imgUrl || this.item.imgUrl === '') {
      this.item.imgUrl = environment.imgPath + 'no-image.png';
    }

    // this.item.imgUrl = environment.imgPath + this.item.imgUrl;
  }

  open(content) {
    this.activeModal = this.modal.open(content);
  }

  close() {
    this.activeModal.close();
  }

  request(reward: Reward, info) {
    const data = {id: reward._id};
    this.rewardService.buyReward(data).subscribe(
      (result: number) => {
        console.log('succes', result);
      },
      (error: any) => {
        console.log('error', error);
      }
    );
    this.activeModal.close();
    this.activeModal = this.modal.open(info);
  }


}
