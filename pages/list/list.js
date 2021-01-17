// pages/list/list.js
const db = wx.cloud.database();
const imgListObj = db.collection('imageList');
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },

  /**
   * 删除图片
   */
  deleteImg(e) {
    const id = e.currentTarget.dataset.id;
    console.log(e)
    const fileID = e.currentTarget.dataset.imgurl;
    console.log(fileID)
    //询问动作
    wx.showModal({
      title: '警告',
      content: '确定要删除嘛',
      success: res => {
        if (res.confirm) {
          //删除记录
          imgListObj.doc(id).remove().then(res => {
            wx.showToast({
              title: '删除成功',
              duration: 1000
            })
            this.deleteCloudFile(fileID)
            this.getImageList();
          }).catch(console.error);
        }

      },
      fail: res => {
        console.log(res);
      }
    })

  },

  /**
   * 删除云储存图片
   */
  deleteCloudFile(fileID) {
    wx.cloud.deleteFile({
      fileList: [fileID],
      success: res => {
        console.log('deleteCloudFile-success', res);
      },
      fail: res => {
        console.log('deleteCloudFile-fail',res);
      }
    })
  },

  /**
   * 去发布
   */
  qufabu() {
    //跳转至上传图片页面
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

  /**
   * 获取图库数据列表
   */
  getImageList() {
    //从云端数据库获取数据
    imgListObj.get({
      success: res => {
        this.setData({
          dataList: res.data
        })
      }
    })
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
    this.getImageList()
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