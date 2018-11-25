import {Component, Input, OnInit} from '@angular/core';
import {Reward} from '../../interfaces/reward';
import {RewardService} from '../../services/reward.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ManageRewardsComponent} from '../manage-rewards.component';
import {RewardCategory} from '../../interfaces/reward-category';

@Component({
  selector: '[app-reward-item]',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss']
})
export class RewardItemComponent implements OnInit {

  @Input() item: Reward;
  @Input() index: number;
  activeModal: NgbActiveModal;
  errorMessage: string;

  constructor(private rewardService: RewardService, private modal: NgbModal, public manageRewards: ManageRewardsComponent) { }

  ngOnInit() {
  }

  open(content) {
    this.activeModal = this.modal.open(content);
  }

  close() {
    this.activeModal.close();
  }

  deleteReward() {
    this.rewardService.deleteReward(this.item._id)
      .subscribe(
      (result: Reward) => {
        this.manageRewards.getRewards();
        this.manageRewards.showMessage('success', 'Reward deleted successfully');
      },
      (error: any) => {
        console.log('error', error);
        this.manageRewards.showMessage('error', 'Sorry, something went wrong' + error);
      }
    );
  }

  reduceRewardCategory(categories: [RewardCategory]) {
    const reducedCategories = categories.slice();
    for (const category of categories) {
      if (category.categoryName === this.item.category) {
        reducedCategories.splice(categories.indexOf(category), 1);
      }
    }
    return reducedCategories;
  }

  updateAttribute(attribute: string, attributeValue) {
    switch (attribute) {
      case 'name':
        this.item.name = attributeValue;
        break;
      case 'worth':
        this.item.worth = attributeValue;
        break;
      case 'category':
        this.item.category = attributeValue;
        break;
      case 'description':
        this.item.description = attributeValue;
        break;
    }
  }

  updateReward() {
    if (this.item.name === '' || this.item.worth.toString() === '' || this.item.category === '' || this.item.description === '') {
      this.errorMessage = 'Please fill out all the fields labeled with an *';
    } else {
      this.item['id'] = this.item._id;
      this.item['name'] = this.item.name;
      this.item['worth'] = this.item.worth;
      this.item['category'] = this.item.category;
      const that = this;
      this.rewardService.updateReward(this.item)
        .subscribe(
          (result: any) => {
            this.manageRewards.getRewards();
            this.activeModal.close();
            this.manageRewards.showMessage('success', 'Reward updated sucessfully');
          },
          (error: any) => {
            console.log('error', error);
            this.manageRewards.errorMessage = 'Sorry, something went wrong' + error;
            setTimeout(function() { that.manageRewards.errorMessage = undefined; }, 3000);
          }
        );
    }
  }

}
