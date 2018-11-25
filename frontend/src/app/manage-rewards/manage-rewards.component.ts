import { Component, OnInit } from '@angular/core';
import {RewardService} from '../services/reward.service';
import {Reward} from '../interfaces/reward';
import {RewardCategory} from '../interfaces/reward-category';
import {User} from '../interfaces/user';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../environments/environment';

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
  }

  addReward() {
    if (this.newItem.name === '' || !this.newItem.worth || this.newItem.category === '' || this.newItem.description === '') {
      this.showMessage('error', 'Please fill out "Name", "Worth", "Category" and "Description".');
    } else {
      const reward = {
        name: this.newItem.name,
        worth: this.newItem.worth,
        category: this.newItem.category,
        description: this.newItem.description
      };
      this.rewardService.createReward(reward)
        .subscribe(
          (result: any) => {
            this.showMessage('success', 'Reward added successfully');
            this.getRewards();
            // const newRewardId = this.rewardList[this.rewardList.length - 1]._id;
            // console.log(this.rewardList[this.rewardList.length - 1].imgUrl);
            // form.action = environment.apiPath + 'reward/fileupload/' + newRewardId + '?token=ABCDEF';
            // form.submit();
            this.newItem = new Reward();
          },
          (error: any) => {
            console.log('error', error);
            this.showMessage('error', 'Sorry, something went wrong: ' + error);
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
          this.newItem.category = this.rewardCategoryList[0].categoryName;
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  updateAttribute(attribute: string, attributeValue) {
    switch (attribute) {
      case 'name':
        this.newItem.name = attributeValue;
        break;
      case 'worth':
        this.newItem.worth = attributeValue;
        break;
      case 'category':
        this.newItem.category = attributeValue;
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
        setTimeout(function() { that.successMessage = undefined; }, 5000);
        break;
      case 'error':
        this.errorMessage = message;
        setTimeout(function() { that.errorMessage = undefined; }, 5000);
        break;
    }
  }

  open(content) {
    this.activeModal = this.modal.open(content);
  }

  close() {
    this.activeModal.close();
  }


  addCategory(categoryName: string) {
    const category = {name: categoryName};
    this.rewardService.createCategory(category)
      .subscribe(
      (result: any) => {
        this.getCategories();
        this.close();
        this.showMessage('success', 'Category added successfully');
      },
      (error: any) => {
        this.showMessage('error', 'Sorry, something went wrong: ' + error);
      }
    );
  }

  removeCategory(categoryId: string) {
    this.rewardService.removeCategory(categoryId)
      .subscribe(
      (result: RewardCategory[]) => {
        this.getCategories();
        this.close();
        this.showMessage('success', 'Category removed successfully');
      },
      (error: any) => {
        this.showMessage('error', 'Sorry, something went wrong: ' + error);
      }
    );
  }



}
