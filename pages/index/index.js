// pages/index/index.js
const db = wx.cloud.database();
const imgListObj = db.collection('imageList');
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    showImg: true
  },


  /**
   * 上传图片
   */
  upload() {
    wx.chooseImage({
      count: 2, //同事上传图片数量
      success: res => {
        wx.showLoading({
          title: '上传中...',
        })
        //多图片处理
        res.tempFilePaths.forEach((item, index) => {
          let imgName = Math.random() * 1000 + '.png';
          //云存储
          wx.cloud.uploadFile({
            cloudPath: imgName,
            filePath: item
          }).then(res => {
            wx.hideLoading(); //隐藏loading图标
            console.log('上传成功', res);
            this.setData({
              imgUrl: res.fileID,
              showImg: false //显示单张预览
            })
            //插入数据库操作
            this.addImgList(res.fileID);
          }).catch(res => {
            console.error('上传失败', res);
          });
        })
        //定义存储名称

      }
    })
  },

  /**
   * 添加图片列表
   */
  addImgList(imgUrl) {
    let db_add_data = {
      name: '小不懂',
      imgUrl,
      time: this.getNowFormatData()
    }
    //添加图片到云数据库
    imgListObj.add({
      data: db_add_data
    }).then(res => {
      wx.showToast({
        title: '上传成功',
        duration: 1000
      })
      //跳转列表页面
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/list/list',
        })
      }, 1000)
      
    }).catch(console.error) 
  },

  getNowFormatData() {
    const date = new Date();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    //拼接
    let currentdate = `${date.getFullYear()}-${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds() <= 9 ? "0" + date.getSeconds() : date.getSeconds() }`;
    return currentdate;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})