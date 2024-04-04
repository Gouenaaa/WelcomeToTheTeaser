<?php

namespace App\DataFixtures;

use App\Entity\Advertisement;
use App\Entity\Application;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ApplicationFixtures extends Fixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $mess = "Hello there,

        I hope this message finds you well. I couldn't help but notice the exciting opportunity for the [adTitle] position at your company. My name is [firstName] [lastName], and I wanted to express my genuine interest in joining your team.
        
        This position truly caught my eye, and I believe that my skills and experience align perfectly with the requirements. I'm not here to bore you with a traditional cover letter, but I want to convey my enthusiasm for this role and the chance to contribute to your organization.
        
        In my previous roles, I've had the privilege of working on projects that challenged me and allowed me to grow both personally and professionally. I'm confident that I can bring a fresh perspective and a strong work ethic to your team.
        
        Thank you for considering my application. I'm excited about the possibility of becoming a valuable member of your organization and contributing to your continued success. If you'd like to discuss further, please don't hesitate to reach out.
        
        Wishing you a fantastic day ahead.
        
        Warm regards,
        [firstName] [lastName]";
        
        $advertisments = $manager->getRepository(Advertisement::class)->findAll();
        $users = $manager->getRepository(User::class)->findUsersByRole("ROLE_SEEKER");
        foreach ($advertisments as $advertisement) {
            foreach(range(0, random_int(1, 3), 1) as $num){
                shuffle($users);
                $application = new Application();
                $mess = str_replace("[adTitle]", $advertisement->getTitle(), $mess);
                $mess = str_replace("[firstName]", $users[0]->getFirstName(), $mess);
                $mess = str_replace("[lastName]", $users[0]->getLastName(), $mess);
                $application
                ->setMessage($mess)
                ->setUser($users[0])
                ->setDate(new \DateTime())
                ->setAdvertisement($advertisement);
                $mess = str_replace($advertisement->getTitle(), "[adTitle]",  $mess);
                $mess = str_replace($users[0]->getFirstName(), "[firstName]", $mess);
                $mess = str_replace($users[0]->getLastName(), "[lastName]",  $mess);
                $manager->persist($application);
            }
        }
        $manager->flush();

    }

    public function getOrder(): int {
        return 4;
    }
}
