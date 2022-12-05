import cv2
import numpy as np

# video=cv2.VideoCapture('rtsp://admin:xike123456@180.166.140.156:554/h264/ch1/sub/av_stream')
# while True:
#   flag, frame = video.read()
#   frame = cv2.resize(frame, (2560, 1440))
#   h,w = frame.shape[:2]
#   mtx = np.load("mtx2.npy")
#   dist = np.load("dist2.npy")
#   newcameramtx, roi=cv2.getOptimalNewCameraMatrix(mtx,dist,(w,h),0,(w,h)) # 自由比例参数
#   dst = cv2.undistort(frame, mtx, dist, None, newcameramtx)
#   x,y,w,h = roi
#   dst = dst[y:y+h, x:x+w]
#   new_image = cv2.resize(dst, (640,360),interpolation=cv2.INTER_LINEAR)
#   cv2.imshow('video',new_image)
#   cv2.waitKey(1)
#   if cv2.waitKey(10) & 0xFF == ord('q'):
#     break
#   cv2.imencode('.jpg', frame)
# video.release()
# cv2.destroyAllWindows()

def calibration(picture):
  frame = cv2.resize(picture, (2560, 1440))
  h, w = frame.shape[:2]
  mtx = np.load("apps/camera/mtx2.npy", encoding='bytes')
  dist = np.load("apps/camera/dist2.npy", encoding='bytes')
  newcameramtx, roi = cv2.getOptimalNewCameraMatrix(mtx, dist, (w, h), 0, (w, h))  # 自由比例参数
  dst = cv2.undistort(frame, mtx, dist, None, newcameramtx)
  x, y, w, h = roi
  dst = dst[y:y + h, x:x + w]
  new_image = cv2.resize(dst, (640, 360))
  return new_image
