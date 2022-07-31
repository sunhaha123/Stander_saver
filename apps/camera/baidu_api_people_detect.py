# -*- coding: utf-8 -*-
"""
Created on Thu Apr  1 14:00:52 2021

@author: sunjh
"""


import base64
import json
import time
import cv2
from PIL import Image, ImageDraw
import numpy as np
import urllib.request
import math
#client_id 为官网获取的AK， client_secret 为官网获取的SK
client_id =	'59npwyOfH9GvA1zcAc8e3Ge4'
client_secret = 'lezRZudMdyLLKDseVdzlTVVpaSoy5dL2'
token_key = '24.27c94bfb0084dd154b58d6f2f0c59d99.2592000.1619849172.282335-19081284'

def get_token():
    host = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
    request = urllib.request.Request(host)
    request.add_header('Content-Type', 'application/json; charset=UTF-8')
    response = urllib.request.urlopen(request)
    token_content = response.read()
    if token_content:
        token_info = json.loads(token_content)
        token_key = token_info['access_token']
    return token_key

def draw_bodys(img,bodys):
      location = bodys['location']
      width = location['width']
      height = location['height']
      left = location['left']
      top = location['top']
      x1,y1 = left,top
      x2,y2 = left+width,top+height
      # x1,y1 ------     
      # |          |
      # |          |
      # |          |
      # --------x2,y2            
      #画框      
      # cv2.rectangle(img,(x1, y1), (x2, y2), (255,0,0), 2)
      # message 是否看手机
      cellphone = bodys['attributes']['cellphone']['score']
      if cellphone >0.5:
            message = 1
      else:
            message = 0
      return x1,y1,x2,y2,img,message

def body_analysis(img_unint8):
#    
##    print(filename)
#    # 二进制方式打开图片文件
#    f = open(filename, 'rb')
    pointsize = 3
    success,encoded_image = cv2.imencode(".jpg",img_unint8)
    img_bytes = encoded_image.tostring()
    img = base64.b64encode(img_bytes)    
    request_url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/body_attr"
    params = dict()
    params['image'] = img
    params = urllib.parse.urlencode(params).encode("utf-8")
    #params = json.dumps(params).encode('utf-8')
    
    access_token = token_key
    begin = time.time()
    request_url = request_url + "?access_token=" + access_token
    request = urllib.request.Request(url=request_url, data=params) 
    request.add_header('Content-Type', 'application/x-www-form-urlencoded')
    response = urllib.request.urlopen(request)
    content = response.read()
    end = time.time()

    print('百度api处理时长:'+'%.2f'%(end-begin)+'秒')
    if content:
        #print(content)
        content=content.decode('utf-8')
#        print(content)
        data = json.loads(content)
        #print(data)
        #print(data) data
        if 'person_info' in data:
            result=data['person_info'][0] 
            if data['person_info'] == []:                     
               print('NO PEOPLE!')
               return 0,0,0,0,np.array([]),1,0  #img,statue,message
            else:
               x1,y1,x2,y2,result_pic,message = draw_bodys(img_unint8,result)
               return x1,y1,x2,y2,result_pic,0,message
        else:
               return 0,0,0,0,np.array([]),1,0
# =============================================================================
# #statue - 1 :未在岗
# #statue - 0 :在岗
# #message - 1 : 看手机
# #message -0： 正常 
# =============================================================================
  
      
if __name__ == '__main__': 
      img_path = r"D:\1yd\Xcode\Video_data\hongkou\jiushengyuan\2021-03-29\192.168.7.102\00020.jpg"       
      img = cv2.imread(img_path)
      #将numpy的数组转换为bytes
      result_img,statue,message =  body_analysis(img)
      
      if result_img.size > 0:
            cv2.imshow('image',img)  
            cv2.waitKey(0)
      else:
            print('-_-')