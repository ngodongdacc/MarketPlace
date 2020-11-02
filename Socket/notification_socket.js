const Notification = require("../Model/notification");
const NotificationService = require("../Services/notificationService");
module.exports = function (io) {
  io.on('connection', function (socket) {
    sendStatus = function (s) {
      socket.emit('status', s);
    }
    // Get chats from mongo collection
    socket.on('id-user', function (data) {
      const IdUser = data.IdUser;
      NotificationService.findByIdNotification(IdUser, (err, data) => {
        if (err) {
          throw err;
        }
        socket.emit(IdUser, data);
      });
    })
    socket.on('input', function (data) {
      let Content = data.Content;
      let IdUser = data.IdUser;
      let dataNotify = {};
      dataNotify.Content = Content;
      dataNotify.IdUser = IdUser;
      dataNotify.URL = Content;
      if (IdUser == '' || Content == '') {
        sendStatus('Vui lòng nhập nội dung thông báo');
      } else {
        NotificationService.createNotification(dataNotify, (err, dataRes) => {
          io.emit(IdUser, [dataRes]);
          sendStatus({
            message: 'Thông báo đã được gửi đi',
            clear: true
          });
        });
      }
    });
    socket.on('update', function (data) {
      let IdNotification = data.id;
      let IdUser = data.IdUser;
      if (IdUser == '' || IdNotification == '') {
        sendStatus('Vui lòng nhập nội dung thông báo');
      } else {
        let dataNotify = {};
        NotificationService.updateNotification(IdNotification, dataNotify, (err, dataRes) => {
          NotificationService.findByIdNotification(IdUser, (err, data) => {
            io.emit('edited', data);
          })
          sendStatus({
            message: 'Đã cập nhật thông báo',
            clear: true
          });
        });
      }
    });
    socket.on('delete', function (data) {
      let IdNotification = data.id;
      let IdUser = data.IdUser;
      if (IdUser == '' || IdNotification == '') {
        sendStatus('Vui lòng nhập nội dung thông báo');
      } else {
        NotificationService.DeleteByIdNotification(IdNotification, (err, data) => {
          NotificationService.findByIdNotification(IdUser, (err, resData) => {
            io.emit('cleared', resData);
          })
          sendStatus({
            message: 'Đã xóa thông báo',
            clear: true
          });
        });
      }
    });
  });
}