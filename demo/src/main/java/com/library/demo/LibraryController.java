package com.library.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/library")
public class LibraryController {

    @Autowired
    private LibraryRepository libraryRepository;

    @GetMapping("/getall")
    public List<Library> GetAll() {
        return libraryRepository.findAll();
    }

    @GetMapping("/getbyid/{id}")
    public Library GetById(@PathVariable long id) {
        return libraryRepository.findById(id).get();
    }

    @PostMapping("/update")
    public void Update(@RequestBody Library library) {
        Library libraryInDb = libraryRepository.findById(library.getId()).get();
        if(libraryInDb != null){
            libraryInDb.setGenre(library.getGenre());
            libraryRepository.save(libraryInDb);
        }
    }
    @DeleteMapping("/deletebyid/{id}")
    public void DeleteById(@PathVariable long id) {
        libraryRepository.deleteById(id);
    }

    @PostMapping("/create")
    public void Create(@RequestBody Library library) {
        libraryRepository.save(library);
    }
}