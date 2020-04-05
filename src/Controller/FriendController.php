<?php

namespace App\Controller;

use Faker\Factory;
use App\Entity\Friend;
use App\Repository\FriendRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FriendController extends AbstractController
{
    /**
     * Récupération de la liste des amis avec pagination
     * 
     * @Route("/friends", name="friends")
     */
    public function index(FriendRepository $friends, PaginatorInterface $paginator, Request $request)
    {
        $pagination = $paginator->paginate(
            $friends->findAll(),
            $request->query->getInt('page', 1),
            7
        );
        return $this->render('friend/liste.html.twig', [
            'friends' => $pagination
        ]);
    }

    /**
     * Génération de la nouvelle liste d'amis (entité Friend)
     * 
     * @Route("/generate", name="friends_generate")
     *
     * @param FriendRepository $repo
     * @param EntityManagerInterface $em
     * @return void
     */
    public function generateFriends(FriendRepository $repo, EntityManagerInterface $em, Request $request)
    {
        // On vide la table à chaque création de fausses de données
        $friends = $repo->findAll();

        if (count($friends) > 0) {
            for ($i = 0; $i < 50; $i++) {
                if (isset($friends[$i])) {
                    $em->remove($friends[$i]);
                    $em->flush();
                }
            }
        }

        // On prépare le faker pour générer les fausses données
        $faker = Factory::create('fr_FR');

        $faker->addProvider(new \Metrakit\EddyMalou\EddyMalouProvider($faker));
        $faker->addProvider(new \Metrakit\EddyMalou\TextProvider($faker));

        // Boucle de création de 50 amis
        for ($i = 0; $i < 50; $i++) {

            // Création d'un nouvel objet ami que l'on remplit avec les fausses données
            $friend = new Friend();
            $friend->setLastName(strtoupper($faker->lastName))
                ->setFirstName($faker->firstName)
                ->setAddress($faker->address())
                ->setPhone($faker->phoneNumber())
                ->setQuote($faker->sentence);

            // On passe l'objet à un manager chargé de le stocker en mémoire
            $em->persist($friend);
        }
        // Le manager pousse les données en BDD
        $em->flush();

        return $this->redirectToRoute("friends");
    }

    /**
     * Suppression d'une entrée Friend dans la base de données
     * 
     * @Route("/delete/{id}", name="friend_delete")
     *
     * @param Friend $friend
     * @return void
     */
    public function remove(Friend $friend, EntityManagerInterface $em)
    {
        $em->remove($friend);
        $em->flush();

        return $this->redirectToRoute("friends");
    }
}
