package com.kotlinspringvue.backend.controller

import com.kotlinspringvue.backend.jpa.Actor
import com.kotlinspringvue.backend.jpa.Order
import com.kotlinspringvue.backend.model.NewActor
import com.kotlinspringvue.backend.model.NewOrder
import com.kotlinspringvue.backend.repository.ActorsRepository
import com.kotlinspringvue.backend.web.response.ResponseMessage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.validation.Valid

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/actors")
class ActorsController {

    @Autowired
    lateinit var actorsRepository: ActorsRepository

    @GetMapping("/allActors")
    fun getActors() = actorsRepository.findAll()

    @DeleteMapping("/delete/{id}")
    fun deleteById(@PathVariable(value = "id") id: Long): ResponseEntity<Void> {
        return actorsRepository.findById(id).map {
            actorsRepository.delete(it)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())
    }
    @PutMapping("/update/{id}")
    fun updateById(@Valid @RequestBody newActor: NewActor, @PathVariable(value = "id") id: Long) : Actor {
        val actor = actorsRepository.findById(id).get()
        actor.email = newActor.email
        actor.firstName = newActor.firstName
        actor.lastName = newActor.lastName
        actor.phoneNumber = newActor.phoneNumber
        return actorsRepository.save(actor)
    }

    @PostMapping("/add")
    fun addNewActor(@Valid @RequestBody newActor: NewActor): ResponseEntity<*> {

        val userCandidate: Optional<Actor> = actorsRepository.findByLastName(newActor.lastName!!)
        if (!userCandidate.isPresent) {
            if (emailExists(newActor.email!!)) {
                return ResponseEntity(
                    ResponseMessage("Email is already in use!"),
                    HttpStatus.BAD_REQUEST
                )
            }

        // Creating new actor
        val actor = Actor(
            0,
            newActor.firstName!!,
            newActor.lastName!!,
            newActor.email!!,
            newActor.phoneNumber!!
        )

        actorsRepository.save(actor)
        return ResponseEntity(ResponseMessage("Actor added successfully!"), HttpStatus.OK)
    } else {
        return ResponseEntity(ResponseMessage("Actor already exists!"),
            HttpStatus.BAD_REQUEST)
    }

    }
    private fun emailExists(email: String): Boolean {
        return actorsRepository.findByLastName(email).isPresent
    }
}