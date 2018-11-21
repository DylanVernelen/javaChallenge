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
      if (category.categoryName === this.item.rewardCategory) {
        reducedCategories.splice(categories.indexOf(category), 1);
      }
    }
    return reducedCategories;
  }

  updateAttribute(attribute: string, attributeValue) {
    switch (attribute) {
      case 'name':
        this.item.rewardName = attributeValue;
        break;
      case 'worth':
        this.item.rewardWorth = attributeValue;
        break;
      case 'category':
        this.item.rewardCategory = attributeValue;
        break;
      case 'description':
        this.item.description = attributeValue;
        break;
    }
  }

  updateReward() {
    console.log(this.item);
    if (this.item.rewardName === '' || this.item.rewardWorth.toString() === '' || this.item.rewardCategory === '' || this.item.description === '') {
      this.errorMessage = 'Please fill out all the fields labeled with an *';
    } else {
      this.item['id'] = this.item._id;
      this.item['name'] = this.item.rewardName;
      this.item['worth'] = this.item.rewardWorth;
      this.item['category'] = this.item.rewardCategory;
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
