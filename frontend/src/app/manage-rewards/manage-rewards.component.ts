import { Component, OnInit } from '@angular/core';
import {RewardService} from '../services/reward.service';
import {Reward} from '../interfaces/reward';
import {RewardCategory} from '../interfaces/reward-category';
import {User} from '../interfaces/user';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-rewards',
  templateUrl: './manage-rewards.component.html',
  styles: []
})
export class ManageRewardsComponent implements OnInit {

  rewardList: Reward[];
  rewardCategoryList: RewardCategory[];
  successMessage: string;
  errorMessage: string;
  newItem: Reward;
  activeModal: NgbActiveModal;

  constructor(public rewardService: RewardService, private modal: NgbModal) { }

  ngOnInit() {
    this.getRewards();
    this.getCategories();
    this.newItem = new Reward();
    this.newItem.rewardCategory = 'Consumables';
  }

  addReward(form) {
    if (this.newItem.rewardName === '' || !this.newItem.rewardWorth || this.newItem.rewardCategory === '' || this.newItem.description === '') {
      this.showMessage('error', 'Please fill out "Name", "Worth", "Category" and "Description".');
    } else {
      const reward = {
        name: this.newItem.rewardName,
        worth: this.newItem.rewardWorth,
        category: this.newItem.rewardCategory,
        description: this.newItem.description
      };
      this.rewardService.createReward(reward)
        .subscribe(
          (result: Reward) => {
            this.showMessage('success', 'Reward added successfully');
            this.getRewards();
            const newRewardId = this.rewardList[this.rewardList.length - 1]._id;
            console.log(this.rewardList[this.rewardList.length - 1].imgUrl);
            // form.action = 'https://nodejs.tomvdr.com/node/api/reward/fileupload/' + newRewardId + '?token=ABCDEF';
            // form.submit();
            this.newItem = new Reward();
          },
          (error: any) => {
            console.log('error', error);
            this.showMessage('error', 'Sorry, something went wrong' + error);
          }
        );
    }
  }

  getRewards() {
    this.rewardService.getAllRewards()
      .subscribe(
        (result: Reward[]) => {
          this.rewardList = result;
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  getCategories() {
    this.rewardService.getAllRewardCategories()
      .subscribe(
        (result: RewardCategory[]) => {
          this.rewardCategoryList = result;
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  updateAttribute(attribute: string, attributeValue) {
    switch (attribute) {
      case 'name':
        this.newItem.rewardName = attributeValue;
        break;
      case 'worth':
        this.newItem.rewardWorth = attributeValue;
        break;
      case 'category':
        this.newItem.rewardCategory = attributeValue;
        break;
      case 'description':
        this.newItem.description = attributeValue;
        break;
    }
  }

  showMessage(messageType: string, message: string) {
    const that = this;
    switch (messageType) {
      case 'success':
        this.successMessage = message;
        setTimeout(function() { that.successMessage = undefined; }, 3000);
        break;
      case 'error':
        this.errorMessage = message;
        setTimeout(function() { that.errorMessage = undefined; }, 3000);
        break;
    }
  }

  open(content) {
    this.activeModal = this.modal.open(content);
  }

  close() {
    this.activeModal.close();
  }

  // addCategory(categoryName: string) {
  //   const category = {name: categoryName};
  //   this.rewardService.createRewardCategory(category)
  //     .subscribe(
  //     (result: any) => {
  //       this.getCategories();
  //     },
  //     (error: any) => {
  //       console.log('error', error);
  //     }
  //   );
  // }

  // removeCategory(categoryId: string) {
  //   this.rewardService.removeCategory(categoryId)
  //     .subscribe(
  //     (result: RewardCategory[]) => {
  //       this.getCategories();
  //     },
  //     (error: any) => {
  //       console.log('error', error);
  //     }
  //   );
  // }

}
