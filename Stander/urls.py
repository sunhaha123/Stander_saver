"""Stander URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
# import xadmin
from django.views.static import serve
from camera import views
from django.views.static import serve

from apps.camera.views import  IndexView

urlpatterns = [
    # url(r'^xadmin/', xadmin.site.urls),
    # url('^$', xadmin.site.urls),
    # url(r'^media/(?P<path>.*)$', serve, {"document_root":MEDIA_ROOT}),
    url(r'^camera/',include('camera.urls', namespace="camera")),
    # url(r'^marquee/', views.feed_status,name="feed_status"),
    # url(r'^media/(?P<path>.*)$', serve, {"document_root":MEDIA_ROOT}),
    # url('^$', IndexView.as_view(), name='index'),
]
