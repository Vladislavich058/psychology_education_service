package com.psychology.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.psychology.entity.Photo;
import com.psychology.exception.FileNotSupportedException;


@Service
public class PhotoServiceImpl implements PhotoService {

	@Value("${project.image}")
	private String path;

	@Override
	public Photo uploadFile(MultipartFile file) throws IOException {
		Path UPLOAD_PATH = Paths.get(path);

		if (!Files.exists(UPLOAD_PATH)) {
			Files.createDirectories(UPLOAD_PATH);
		}

		if (!file.getContentType().equals("image/jpeg") && !file.getContentType().equals("image/png")
				&& !file.getContentType().equals("image/jpg")) {
			throw new FileNotSupportedException("Only .jpeg, .png, .jpg images supported!");
		}

		String fileName = file.getOriginalFilename();
		String uniqueFileName = UUID.randomUUID().toString().concat(fileName.substring(fileName.lastIndexOf(".")));

		Path filePath = UPLOAD_PATH.resolve(uniqueFileName);

		Files.copy(file.getInputStream(), filePath);

		String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/" + path).path(uniqueFileName)
				.toUriString();

		return Photo.builder().name(uniqueFileName).uri(fileUri).size(file.getSize()).build();

	}

}
