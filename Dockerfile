FROM httpd:alpine

LABEL "author"="WindSnowLi"
LABEL "version"="1.0.1"
LABEL "email"="windsnowli@163.com"
# 配置环境变量支持中文
ENV LANG="en_US.UTF-8"

COPY ./dist /admin
WORKDIR /admin

RUN rm -rf /usr/local/apache2/htdocs/*
RUN mv /admin/* /usr/local/apache2/htdocs/
# 后台端口
EXPOSE 80
