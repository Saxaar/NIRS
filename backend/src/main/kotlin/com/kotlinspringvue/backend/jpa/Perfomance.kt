package com.kotlinspringvue.backend.jpa

import javax.persistence.*

@Entity
@Table(name = "perfomances")
data class Perfomance (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,

    @Column(name="name")
    var name: String?=null,

    @Column(name="date")
    var date: String?=null,

    @Column(name="phone_number")
    var phoneNumber: String?=null,

    @Column(name="manager_full_name")
    var managerFullName: String?=null,


)


