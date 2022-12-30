package com.kotlinspringvue.backend.controller

import com.kotlinspringvue.backend.jpa.Order
import com.kotlinspringvue.backend.jpa.Perfomance
import com.kotlinspringvue.backend.jwt.JwtProvider
import com.kotlinspringvue.backend.model.NewOrder
import com.kotlinspringvue.backend.model.NewPerfomance
import com.kotlinspringvue.backend.repository.PerfomanceRepository
import com.kotlinspringvue.backend.web.response.ResponseMessage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.validation.Valid


@CrossOrigin(origins = ["*"], maxAge = 3600)
@RestController
@RequestMapping("/api/addPerfomance")
class PerfomanceController {

    @Autowired
    lateinit var perfomanceRepository: PerfomanceRepository

    @GetMapping("/perfomances")
    fun getPerfomances() = perfomanceRepository.findAll()

//    @PostMapping("/update")
//    fun updateById(@Valid @RequestBody newPerfomanceRequest: NewPerfomance, ): ResponseEntity<*> {
//
//        return perfomanceRepository.findById().map {
//            perfomanceRepository.save(it)
//            ResponseEntity<Void>(HttpStatus.OK)
//        }.orElse(ResponseEntity.notFound().build())
//
//        return ResponseEntity(ResponseMessage("Prefomance updated"),HttpStatus.OK)
//    }

    @DeleteMapping("/delete/{id}")
    fun deleteById(@PathVariable(value = "id") id: Long): ResponseEntity<Void> {
        return perfomanceRepository.findById(id).map {
            perfomanceRepository.delete(it)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())
    }
    @PutMapping("/update/{id}")
    fun updateById(@Valid @RequestBody newPerfomanceRequest: NewPerfomance, @PathVariable(value = "id") id: Long) : Perfomance {
        val perfomance = perfomanceRepository.findById(id).get()
        perfomance.date = newPerfomanceRequest.date
        perfomance.managerFullName = newPerfomanceRequest.managerFullName
        perfomance.phoneNumber = newPerfomanceRequest.phoneNumber
        perfomance.name = newPerfomanceRequest.name
        return perfomanceRepository.save(perfomance)
    }

    @PostMapping("/add")
    fun addNewPerfomance(@Valid @RequestBody newPerfomanceRequest: NewPerfomance): ResponseEntity<*> {

        val newPerfomance: Optional<Perfomance> = perfomanceRepository.findByName(newPerfomanceRequest.name!!)

//        if (!newPerfomance.isPresent) {
//            if (perfomanceExists(newPerfomanceRequest.name!!) && perfomanceExists() ) {
//                return ResponseEntity(
//                    ResponseMessage("Perfomance is already in list!"),
//                    HttpStatus.BAD_REQUEST) }
//            }

      //создаем новое выступление и записываем в бд
      val perfomance = Perfomance(
          0,
          newPerfomanceRequest.name!!,
          newPerfomanceRequest.date!!,
          newPerfomanceRequest.phoneNumber!!,
          newPerfomanceRequest.managerFullName!!
      )
        perfomanceRepository.save(perfomance)

        return ResponseEntity(ResponseMessage("Perfomance added"),HttpStatus.OK)
    }

//    private fun perfomanceExists(name: String): Boolean {
//        return perfomanceRepository.findByName(name).isPresent
//    }
}