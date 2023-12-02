package com.psychology.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.psychology.entity.Photo;

public interface PhotoService {
	Photo uploadFile(MultipartFile file) throws IOException;
}
